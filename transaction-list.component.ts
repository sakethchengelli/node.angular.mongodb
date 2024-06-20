import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { Transaction } from '../transaction.model';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[] = [];
  displayedColumns: string[] = ['id', 'date', 'Comments', 'status'];

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    const startDate = '2020-01-01';
    const endDate = '2020-12-31';
    this.transactionService.getTransactions(startDate, endDate).subscribe(data => {
      this.transactions = data;
    });
  }
}
