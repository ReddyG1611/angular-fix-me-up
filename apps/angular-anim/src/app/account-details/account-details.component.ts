import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '@angular-anim/shared/models';
import { AccountService } from '@angular-anim/shared/services';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'angular-anim-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountDetailsComponent implements OnInit, OnDestroy {
  accountDetails: Account | undefined;
  detroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.detroy$)).subscribe((params) => {
      this.getAccountDetails(params['id']);
    });
  }

  getAccountDetails(id: string): void {
    this.accountService
      .getAccount(id)
      .pipe(takeUntil(this.detroy$))
      .subscribe((account) => {
        this.accountDetails = account;
      });
  }

  back(): void {
    this.router.navigateByUrl('/')
  }

  ngOnDestroy(): void {
    this.detroy$.next(true);
    this.detroy$.complete();
  }
}
