/**
 * TODO: 10. Asynchronous Programming (RxJS)
 * TODO: 13. Angular (NX) Architecture
 */
import { Account } from '@angular-anim/shared/models';
import { AccountService } from '@angular-anim/shared/services';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'sum-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.scss'],
})
export class AccountSummaryComponent implements OnInit, OnDestroy {
  accounts$: Observable<Account[]> = of([]);
  accounts: Account[] = [];
  filteredAccounts: Account[] = [];
  accountsFilter = new FormControl();
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private accountService: AccountService, private router: Router) {}
  

  ngOnInit(): void {
    this.accountService.getAccounts()
    .pipe(takeUntil(this.destroy$))
    .subscribe((accounts) => {
      this.accounts = accounts;
      this.filteredAccounts = [...this.accounts]
    });

    this.accountsFilter.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.filteredAccounts = this.filterAccounts(this.accounts, value);
      });
  }

  filterAccounts(accounts: Account[], filterValue: string) {
    return accounts.filter(
      (acc) => acc.currency === filterValue || filterValue === ''
    );
  }

  goToAccountDetails(id: string) {
    this.router.navigateByUrl(`/account/${id}`)
  }

  trackById(index: number, account: Account) {
    return account ? account.id: index
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
