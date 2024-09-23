/*1. Create a Lightning Web Component with two buttons, "Button1" and "Button2" on the click on button1 it should display the text
	"button1 Clicked" and on the click of button2 it should display the text "button2 is clicked"
	By default it should display the text " Clicked on any button to see the changes into the UI"*/
import { LightningElement } from 'lwc';

export default class PantherSchoolAssignment1 extends LightningElement {

    defaultValue ='Clicked on any button to see the changes into the UI';

    handleClick(event){
        if(event.target.label =='Button 1'){
            this.defaultValue ='Button1 Clicked';
        }
        else{
            this.defaultValue ='Button2 Clicked';
        }

    }
}