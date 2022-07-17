import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentenceBuilderComponent } from './sentence-builder.component';

describe('SentenceBuilderComponent', () => {
  let component: SentenceBuilderComponent;
  let fixture: ComponentFixture<SentenceBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentenceBuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SentenceBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
