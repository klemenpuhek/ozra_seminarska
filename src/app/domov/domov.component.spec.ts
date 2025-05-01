import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomovComponent } from './domov.component';

describe('DomovComponent', () => {
  let component: DomovComponent;
  let fixture: ComponentFixture<DomovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomovComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DomovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
