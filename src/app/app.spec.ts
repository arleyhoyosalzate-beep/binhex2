import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it('should render the converter title', async () => {
    const fixture = TestBed.createComponent(App);

    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;
    const title = element.querySelector('h1');

    expect(title?.textContent).toContain(
      'Conversor de sistemas numéricos',
    );
  });
});