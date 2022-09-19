import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AccountDetailsComponent } from './account-details.component';

describe('AccountDetailsComponent', () => {
  let component: AccountDetailsComponent;
  let fixture: ComponentFixture<AccountDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{provide: ActivatedRoute, useValue: {params: of({id:'1234'})}}],
      declarations: [AccountDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountDetailsComponent);
    TestBed.inject(ActivatedRoute)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
