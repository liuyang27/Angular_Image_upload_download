import { Component, ViewChild } from '@angular/core';

import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})






export class AppComponent {
  data = '';
  canvasImg=null;
  imgurl='';
  mycanvas:any;

  @ViewChild('file',{static: false}) file:any;
  @ViewChild('logo',{static: false}) logo:any;
  @ViewChild('qrcodeborder',{static: false}) qrcodeborder:any;
  @ViewChild('test',{static: false}) test:any;

  filechange(event){
    console.log(this.qrcodeborder);
    this.mycanvas = this.qrcodeborder.qrcElement.nativeElement.children[0];

  
    // var canvas = this.test;
    // var ctx = canvas.getContext("2d");
    // var img = document.getElementById("scream");
    // ctx.drawImage(img, 10, 10);



    ///////////////logo/////////////////////
    const file=event.target.files[0];
    const reader = new FileReader();
    reader.onload = (filedata) =>{
      this.imgurl = reader.result + '';
    }
    reader.readAsDataURL(file);

  }
       
  


  
  download(){
      html2canvas(document.querySelector("#dldiv")).then(canvas => {
        // 修改生成的宽度
        //canvas.style.width = "100px";
        // canvas.style.height = "1000px";
        console.log(canvas, "生成的画布文件");
        this.canvasImg = canvas.toDataURL("image/png");


        //var base64Img = this.canvasImg;
        var oA = document.createElement('a');
        oA.href = this.canvasImg;
        oA.download = "testpic";
        var event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        oA.dispatchEvent(event);
      });

      
  }

  getDOM(){
    var qrcodeCanvas:any=document.querySelector(".qrcode canvas");

    var ctx = qrcodeCanvas.getContext('2d');
    var qrsize= qrcodeCanvas.width;
    var maxlogosize = qrsize*0.25;
    var r;
    var imgObj = new Image();
    imgObj.src = "http://images.cnblogs.com/cnblogs_com/html5test/359114/r_test.jpg";
    imgObj.onload = function(){ 
            var logoWidth=imgObj.width;
            var logoHeight=imgObj.height;
            if(logoWidth>maxlogosize || logoHeight>maxlogosize){
                if(logoWidth>=logoHeight){
                    r=maxlogosize/logoWidth;
                    logoWidth=maxlogosize;
                    logoHeight=logoHeight*r;
                }else{
                    r=maxlogosize/logoWidth;
                    logoHeight=maxlogosize;
                    logoWidth=logoWidth*r;
                }
            }

            ctx.drawImage(this,qrsize/2-maxlogosize/2,qrsize/2-maxlogosize/2,logoWidth,logoHeight);

    }

  }


}
