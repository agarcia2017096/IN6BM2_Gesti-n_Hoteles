import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoteTableroComponent } from './hote-tablero.component';

describe('HoteTableroComponent', () => {
  let component: HoteTableroComponent;
  let fixture: ComponentFixture<HoteTableroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoteTableroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HoteTableroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
