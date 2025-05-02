import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptListComponent } from './recept-list.component';

describe('ReceptListComponent', () => {
  let component: ReceptListComponent;
  let fixture: ComponentFixture<ReceptListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceptListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
