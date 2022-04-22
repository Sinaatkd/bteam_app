import { Component, OnInit } from '@angular/core';
import { DiscountCodeModel } from 'src/app/models/discountcode.model';
import { SpecialAccountService } from 'src/app/services/special-account.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss'],
})
export class DiscountComponent implements OnInit {

  isLoading = true;
  codes: DiscountCodeModel[];

  constructor(
    private specialAccountService: SpecialAccountService
  ) { }

  ngOnInit() {
    this.specialAccountService.getAllDiscountCodes().subscribe(codes => {
      this.codes = codes;
      this.isLoading = false;
    });
  }

}
