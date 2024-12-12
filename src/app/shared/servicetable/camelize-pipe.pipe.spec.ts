import { CamelizePipePipe } from './camelize-pipe.pipe';

describe('CamelizePipePipe', () => {
  it('create an instance', () => {
    const pipe = new CamelizePipePipe();
    expect(pipe).toBeTruthy();
  });
});
