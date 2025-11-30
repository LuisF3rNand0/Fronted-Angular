import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoProductos } from './pago-productos';

describe('PagoProductos', () => {
  let component: PagoProductos;
  let fixture: ComponentFixture<PagoProductos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagoProductos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagoProductos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
