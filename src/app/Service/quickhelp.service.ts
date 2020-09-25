import { Injectable } from '@angular/core';
export interface Mail {
  id: number;
  sender: string;
  senderPhoto: string;
  subject: string;
  date:string;
  body: string;
  unread: boolean;
  sent: boolean;
  starred: boolean;
  draft: boolean;
  trash: boolean;
  selected:boolean
}

const Mails = [
  {
    id:1,   
    sender:'Envato Market', 
    senderPhoto:'../../../assets/tuy.png',
    subject:'Your updated item has been approved',
    date:'4:08 PM',
    body:'<p>Congratulations! Your update to Azimuth - Angular 2 Admin Template on ThemeForest has been approved. '+
    'You can view your item here: </p>'+
    '<p><a href="http://themeforest.net/item/azimuth-angular-2-admin-template/19182105" target="blank">http://themeforest.net/item/azimuth-angular-2-admin-template/19182105</a></p>' +
    '<p>Thanks for your submission!</p>' +
    '<p>Regards,<br> Envato Market Team</p>', 
    unread:true,
    sent:false,
    starred:false,
    draft:false,
    trash:false,
    selected:false 
  },
  {
    id:2,
    sender:'Josiah Fromdahl',
    senderPhoto:'../../../assets/tuy.png',
    subject:'Useful tool for those who are involved in SEO',
    date:'9:47 AM',
    body:'<p>Hi, I want to introduce the Website Reviewer is an incredibly useful tool for those who are involved in SEO and web designing. '+
    'This particular tool will provide you with quick website review and SEO audit of the websites you’ve created so '+
    'you will be able to determine if and where any changes should be made so you can make it as effective '+
    'as possible when it comes to getting visitors and keeping them interested. '+
    'Unlike many similar tools, website reviewer is completely free.</p>',
    unread:true,
    sent:false,
    starred:true,
    draft:false,
    trash:false,
    selected:false 
  },
  {
    id:3,
    sender:'Google Cloud Platform',
    senderPhoto:'../../../assets/tuy.png',
    subject:'Lessons from the field: surviving success with Customer Reliability Engineering',
    date:'Jan 5',
    body:'<h4>TRENDING</h4>'+
    '<p>For those who missed the early adoption of Infrastructure as a Service circa 2007,' +
    'this in-depth history stresses why businesses need to begin building around "serverless" architectures.</p>' +
    '<p>A stress test led by Pivotal’s Cloud Foundry team ran 250,000 real-life app containers on Google Compute Engine. '+
    'GCP made it possible to stand the environment up in hours, and scaled it without pre-planning.</p>' +
    '<p>Dig in to a new site packed with open-source tools and resources that aims to make it easy for anyone to explore, develop, and share AI creations. '+
    'Play an AI duet, or have your phone guess what you’re drawing.</p>',
    unread:false,
    sent:false,
    starred:false,
    draft:false,
    trash:false,
    selected:false 
  }
];
@Injectable({
  providedIn: 'root'
})
export class QuickhelpService {

  constructor() { }
  public getAllMails():Mail[] {
    return Mails.filter(mail => mail.sent == false && mail.draft == false && mail.trash == false);
  }

  public getStarredMails():Mail[] {
    return Mails.filter(mail => mail.starred == true);
  }

  public getSentMails():Mail[] {
    return Mails.filter(mail => mail.sent == true);
  }

  public getDraftMails():Mail[] {
    return Mails.filter(mail => mail.draft == true);
  }

  public getTrashMails():Mail[] {
    return Mails.filter(mail => mail.trash == true);
  }

  public getMail(id: number | string):Mail {
    return Mails.find(mail => mail.id === +id);
  }
  public insertMail(mail:Mail):void {
    Mails.push(mail);
  }
}
