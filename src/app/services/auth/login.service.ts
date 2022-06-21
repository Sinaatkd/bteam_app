import { BASE_API_URL } from './../../utilities/variables';
import { Token } from './../../DTOs/auth/token.dto';
import { LoginDTO, VerificationLoginDTO } from './../../DTOs/auth/login.dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
  ) { }

  loginWithPhonePassword(loginDTO: LoginDTO): Observable<Token> {
    return this.http.post<Token>(`${BASE_API_URL}login/phone-pass/`, loginDTO);
  }

  loginWithVerification(verificationCodeDTO: VerificationLoginDTO): Observable<Token> {
    return this.http.post<Token>(`${BASE_API_URL}login/verification-code/`, verificationCodeDTO);
  }

  sendVerificationCode(phoneNumber): Observable<{message: string}> {
    return this.http.post<{message: string}>(`${BASE_API_URL}send-verification-code/`, {phone_number: phoneNumber})
  }

  forgotPass(phone_number, verification_code, new_pass): Observable<{message: string}> {
    return this.http.post<{message: string}>(`${BASE_API_URL}forgot-pass/`, {phone_number, verification_code, new_pass})
  }
}
