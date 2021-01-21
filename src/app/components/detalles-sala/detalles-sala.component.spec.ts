import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesSalaComponent } from './detalles-sala.component';

describe('DetallesSalaComponent', () => {
  let component: DetallesSalaComponent;
  let fixture: ComponentFixture<DetallesSalaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesSalaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
