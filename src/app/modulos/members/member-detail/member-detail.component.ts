import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
   console.log( this.route.snapshot.paramMap.get('id'))
  }

}
