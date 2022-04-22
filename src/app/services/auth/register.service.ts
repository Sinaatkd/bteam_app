import { BASE_API_URL } from './../../utilities/variables';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterDTO } from 'src/app/DTOs/auth/register.dto';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private http: HttpClient,
  ) { }

  registerUser(registerDTO: RegisterDTO): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${BASE_API_URL}register/`, registerDTO);
  }
}
