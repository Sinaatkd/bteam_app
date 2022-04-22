import { SpecialAccountModel } from './../models/specialAccount.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_API_URL } from '../utilities/variables';
import { CheckDiscountCodeDTO } from '../DTOs/checkDiscountCode.dto';
import { TransactionDTO } from '../DTOs/createTransaction.dto';
import { DiscountCodeModel } from '../models/discountcode.model';

@Injectable({
  providedIn: 'root'
})
export class SpecialAccountService {

  constructor(
    private http: HttpClient
  ) { }

  getAllSpecialAccountItems(): Observable<SpecialAccountModel[]> {
    return this.http.get<SpecialAccountModel[]>(`${BASE_API_URL}special-account-items/`)
  }

  checkDiscountCode(code, amount): Observable<CheckDiscountCodeDTO> {
    return this.http.post<CheckDiscountCodeDTO>(`${BASE_API_URL}check-discount-code/`, {code, amount})
  }

  creaeteTransaction(transactionDTO: TransactionDTO): Observable<TransactionDTO> {
    return this.http.post<TransactionDTO>(`${BASE_API_URL}creaet-transaction/`, transactionDTO)
  }

  sendReceipt(transactionDTO: TransactionDTO): Observable<TransactionDTO> {
    return this.http.put<TransactionDTO>(`${BASE_API_URL}send-receipt/${transactionDTO.id}/`, transactionDTO)
  }

  getAllDiscountCodes(): Observable<DiscountCodeModel[]> {
    return this.http.get<DiscountCodeModel[]>(`${BASE_API_URL}discount-codes/`)
  }

  cancelSpecialAccountTransaction() {
    return this.http.get(`${BASE_API_URL}cancel-transaction/`)
  }
}
