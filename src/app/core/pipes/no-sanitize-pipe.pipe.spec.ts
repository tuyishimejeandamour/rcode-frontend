import { NoSanitizePipePipe } from './no-sanitize-pipe.pipe';

describe('NoSanitizePipePipe', () => {
  it('create an instance', () => {
    const pipe = new NoSanitizePipePipe();
    expect(pipe).toBeTruthy();
  });
});
