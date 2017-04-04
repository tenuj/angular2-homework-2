/**
 * /**
 * This code has been written by Denis Shavenzov
 * If you have any questions or notices you can contact me by email shavenzov@gmail.com
 *
 * PrimeNG button component with corrected error that didn't allow dynamic remove/set icon
 *
 */

import {Button} from "primeng/components/button/button";
import {Directive} from "@angular/core";
import {DomHandler} from "primeng/components/dom/domhandler";

@Directive({
  selector: '[fixedButton]',
  providers: [DomHandler]
})
export class FixedButton extends Button
{
  public getStyleClass(): string {
    let styleClass = 'ui-button ui-widget ui-state-default ' + this.cornerStyleClass;

    return styleClass + ' ' + this.getButtonIconClass();
  }

  private buttonIconClass : string;

  public getButtonIconClass() : string
  {
    let buttonIconClass : string = '';

    if ( this.icon )
    {
      if( this.label != null && this.label != undefined )
      {
        if ( this.iconPos == 'left' )
        {
          buttonIconClass = 'ui-button-text-icon-left';
        }
        else
        {
          buttonIconClass = 'ui-button-text-icon-right';
        }
      }
      else
      {
        buttonIconClass = 'ui-button-icon-only';
      }
    }
    else
    {
      buttonIconClass = 'ui-button-text-only';
    }

    this.buttonIconClass = buttonIconClass;

    return buttonIconClass;
  }

  public get icon(): string {
    return this._icon;
  }

  public set icon( val : string )
  {
    this._icon = val;

    if ( this.initialized )
    {
      if ( val )
      {
        this.createIconElement( val );
      }
      else
      {
        this.removeIconElement();
      }

      this.domHandler.removeClass( this.el.nativeElement, this.buttonIconClass );
      this.domHandler.addClass( this.el.nativeElement, this.getButtonIconClass() );
    }
  }

  private createIconElement( val : string ) : void
  {
    let element      : any    = this.domHandler.findSingle( this.el.nativeElement, '.fa');

    if ( ! element )
    {
      element = document.createElement( "span" );
      this.el.nativeElement.appendChild( element );
    }

    let iconPosClass : string = ( this.iconPos == 'right' ) ? 'ui-button-icon-right': 'ui-button-icon-left';
    element.className = iconPosClass  + ' ui-c fa fa-fw ' + val;
  }

  private removeIconElement() : void
  {
    let element : any = this.domHandler.findSingle( this.el.nativeElement, '.fa' );

    if ( element )
    {
      this.el.nativeElement.removeChild( element );
    }
  }
}
