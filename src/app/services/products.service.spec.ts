import { TestBed } from '@angular/core/testing';
import { throwError } from 'rxjs';

import { ProductsService } from './products.service';

/* Mocks */
import { productMock } from '../mocks/mock-data/product-mock';
import { productListMock } from '../mocks/mock-data/products-mock';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductsService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.get(ProductsService);

    /*
    * Testbed.get uses the angular injector to get an instance of the service by searching through
    * the different modules levels (due to its hierarchical injection system), making it prone to
    * failure if it does not find the service to inject.
    * Meanwhile, debugElement injector gets the service directly from the component under testing,
    * making it an "always work" option because the injector does not have to search through module
    * levels, since it gets it directly from this component.
    */
    // ** Example with debugElement: service = fixture.debugElement.injector.get(ProductsService);
  });

  it('TEST 0: should be created the service', () => {
    expect(service).toBeTruthy();
  });

  it('TEST 1: should call manageCart, emit something and set localstorage', () => {
    localStorage.clear();
    const spyManager = spyOn(service, 'manageCart').and.callThrough();
    const spyEmitter = spyOn(service.productsCounter, 'emit').and.callThrough();
    const product = { ...productMock, type: 'add' };
    let productList;
    let productListStorage;

    service.productsCounter.subscribe(res => productList = res);
    service.manageCart(product);
    productListStorage = JSON.parse(localStorage.getItem('user-products'));

    expect(productListStorage).not.toBeNull();
    expect(productListStorage).toEqual(productList);
    expect(productList[0]).toEqual(product);
    expect(spyManager).toHaveBeenCalled();
    expect(spyEmitter).toHaveBeenCalled();
  });

  it('TEST 2: should call manageCart >> if addProducts', () => {
    const spyManager = spyOn(service, 'manageCart').and.callThrough();
    const spyAdd = spyOn(service, 'addProducts').and.callThrough();
    const product = { ...productMock, type: 'add' };

    service.manageCart(product);

    expect(spyManager).toHaveBeenCalled();
    expect(spyAdd).toHaveBeenCalled();
  });

  it('TEST 3: should call manageCart >> if deleteProducts', () => {
    const spyManager = spyOn(service, 'manageCart').and.callThrough();
    const spyDelete = spyOn(service, 'deleteProducts').and.callThrough();
    const product = { ...productMock, type: 'delete' };

    service.manageCart(product);

    expect(spyManager).toHaveBeenCalled();
    expect(spyDelete).toHaveBeenCalled();
  });

  it('TEST 4: should call manageCart >> if deleteAllProducts', () => {
    const spyManager = spyOn(service, 'manageCart').and.callThrough();
    const spyDeleteAll = spyOn(service, 'deleteAllProducts').and.callThrough();
    const product = { ...productMock, type: 'deleteAll' };

    service.manageCart(product);

    expect(spyManager).toHaveBeenCalled();
    expect(spyDeleteAll).toHaveBeenCalled();
  });

  it('TEST 5: should call addProducts and add a product', () => {
    localStorage.clear();
    const spyManager = spyOn(service, 'addProducts').and.callThrough();
    const product = { ...productMock, type: 'add' };
    let productList;
    let productListStorage;

    service.productsCounter.subscribe(res => productList = res);
    service.manageCart(product);
    productListStorage = JSON.parse(localStorage.getItem('user-products'));

    expect(productListStorage).not.toBeNull();
    expect(productListStorage).toEqual(productList);
    expect(productList[0]).toEqual(product);
    expect(spyManager).toHaveBeenCalled();
  });

  it('TEST 6: should call deleteProducts and delete a product', () => {
    localStorage.setItem('user-products', JSON.stringify(productListMock));
    const spyManager = spyOn(service, 'deleteProducts').and.callThrough();
    const product = { ...productMock, type: 'delete' };
    let productList;
    let productListStorage;

    service.productsCounter.subscribe(res => productList = res);
    service.manageCart(product);
    productListStorage = JSON.parse(localStorage.getItem('user-products'));

    expect(productListStorage).not.toBeNull();
    expect(productListStorage).not.toContain(product);
    expect(productList).not.toContain(product);
    expect(spyManager).toHaveBeenCalled();
  });

  it('TEST 7: should call deleteProducts and delete an item of a product', async () => {
    localStorage.clear();
    localStorage.setItem('user-products', JSON.stringify(productListMock));
    const product = {
      code: 5,
      name: 'name5',
      description: 'A name5 product',
      price: '200',
      quantity: 1
    };
    const spyManager = spyOn(service, 'deleteProducts').and.callThrough();
    let productListStorage;

    service.manageCart({ ...product, type: 'add' }); // Add a product to increase quantity by 1 > total of 2 items
    productListStorage = JSON.parse(localStorage.getItem('user-products'));
    expect(productListStorage[4].quantity).toEqual(2);

    service.manageCart({ ...product, type: 'delete' }); // ...and then delete an item
    productListStorage = JSON.parse(localStorage.getItem('user-products'));
    expect(productListStorage[4].quantity).toEqual(1);

    expect(spyManager).toHaveBeenCalled();
  });

  it('TEST 8: should call deleteProducts and do nothing', async () => {
    localStorage.clear();
    localStorage.setItem('user-products', JSON.stringify(productListMock));
    const product = { // A product with id 15 does not exist in localstorage
      code: 15,
      name: 'name15',
      description: 'A name15 product',
      price: '200',
      quantity: 1
    };
    const spyManager = spyOn(service, 'deleteProducts').and.callThrough();
    let productListStorage;

    service.manageCart({ ...product, type: 'delete' });
    productListStorage = JSON.parse(localStorage.getItem('user-products'));

    expect(productListStorage).toEqual(productListMock);
    expect(spyManager).toHaveBeenCalled();
  });

  it('TEST 9: should call deleteAllProducts and delete all items of a product', () => {
    localStorage.clear();
    localStorage.setItem('user-products', JSON.stringify(productListMock));
    const product = {
      code: 5,
      name: 'name5',
      description: 'A name5 product',
      price: '200',
      quantity: 1
    };
    const spyDelete = spyOn(service, 'deleteAllProducts').and.callThrough();
    let productListStorage;
    let productExists;

    service.manageCart({ ...product, type: 'add' }); // Add a product to increase quantity by 1 > total of 2 items
    productListStorage = JSON.parse(localStorage.getItem('user-products'));
    expect(productListStorage[4].quantity).toEqual(2);

    service.manageCart({ ...product, type: 'deleteAll' });
    productListStorage = JSON.parse(localStorage.getItem('user-products')); // ...and then it should delete the entire product
    productExists = productListStorage.find(p => p.code === 5);

    expect(productExists).toBeUndefined();
    expect(spyDelete).toHaveBeenCalled();
  });

  it('TEST 10: should call getData with success from observable', (done: DoneFn) => {
    const spyGet = spyOn(service, 'getData').and.callThrough();

    service.getData().subscribe(res => {
      expect(res).toEqual(productListMock);
      done();
    });

    expect(spyGet).toHaveBeenCalled();
  });

  it('TEST 11: should call getData with success from promise', (done: DoneFn) => {
    const spyGet = spyOn(service, 'getData').and.callThrough();

    service.getData().toPromise().then(res => {
      expect(res).toEqual(productListMock);
      done();
    });

    expect(spyGet).toHaveBeenCalled();
  });

  it('TEST 12: should call getData with error from observable', () => {
    const spyGet = spyOn(service, 'getData').and.returnValue(throwError('Observable error'));

    service.getData().subscribe(
      res => fail('Expected an error'),
      err => expect(err).toEqual('Observable error')
    );

    expect(spyGet).toHaveBeenCalled();
  });

  it('TEST 13: should call getData with error from promise', () => {
    const spyGet = spyOn(service, 'getData').and.returnValue(throwError('Promise error'));

    service.getData().toPromise().then(
      res => fail('Expected an error'),
      err => expect(err).toEqual('Promise error')
    );

    expect(spyGet).toHaveBeenCalled();
  });
});
