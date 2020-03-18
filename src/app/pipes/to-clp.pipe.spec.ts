import { ToClpPipe } from './to-clp.pipe';

describe('ToClpPipe', () => {
  let clpPipe: ToClpPipe;

  /* Creates an object instance */
  beforeEach(() => {
    clpPipe = new ToClpPipe();
  });

  it('TEST 0: create a pipe instance', () => {
    expect(clpPipe).toBeTruthy();
  });

  it('TEST 1: Price should be formatted correctly from a number', () => {
    expect(clpPipe.transform(125)).toEqual('$125.-');
  });

  it('TEST 2: Price should be formatted correctly from a string', () => {
    expect(clpPipe.transform('125')).toEqual('$125.-');
  });

  it('TEST 3: Empty price should show n/a message ', () => {
    expect(clpPipe.transform('')).toEqual('N/A');
  });

  it('TEST 4: Letter input should show n/a message ', () => {
    expect(clpPipe.transform('q')).toEqual('N/A');
  });
});
