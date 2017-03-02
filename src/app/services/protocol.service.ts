export class ProtocolService {

  private protocol : string = null;

  public constructor()
  {
    this.protocol = location.protocol;

    console.log( 'protocol', this.protocol );
  }

  public resolveProtocol( url : string ) : string
  {
    return `${this.protocol}//${url}`;
  }

}
