export class Eventos {
  constructor(
    public _id: String,
    public nombreEvento: String,
    public descripcion: String,
    public precio: Number,
    public disponibilidad: String,
    public fecha: String,
    public hora: String,
    public idHotel: String,

  ){
  }
}
