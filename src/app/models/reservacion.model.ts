export class Reservacion {
    constructor(
      public _id: String,
      public idHotel: String,
      public idUsuario: String,
      public idHabitacion: String,
      public fechaInicio: String,
      public totalNoches: Number,
    ){}
  }
  