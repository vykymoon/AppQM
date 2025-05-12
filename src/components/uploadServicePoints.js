import { db } from "./FireBase";
import { collection, addDoc } from "firebase/firestore";

const servicePoints = [
  { nombre: "Restaurante Escuela", horarios: "Lunes a viernes: Desayunos: 7:00 a.m. - 10:00 a.m. Almuerzos: 12:30 m - 3:00 p.m." },
  { nombre: "Restaurante Arcos", horarios: "Lunes a viernes Almuerzos: 12:00 m - 3:00 p.m." },
  { nombre: "Embarcadero Carta", horarios: "Lunes a sábado Desayunos: 7:00 a.m. - 10:00 a.m. Almuerzos: 11:30 a.m. - 3:00 p.m. Sábado hasta las 2:30 p.m." },
  { nombre: "Terraza Living", horarios: "Lunes a sábado Desayunos: 8:00 a.m. - 10:00 a.m. Almuerzos: 11:30 a.m. - 3:30 p.m. Sábados no hay servicio de almuerzo." },
  { nombre: "Kioskos", horarios: "Lunes a viernes, 11:30 p.m. - 3:30 p.m." },
  { nombre: "Autoservicio Menú del día", horarios: "Lunes a viernes, 11:00 a.m. - 3:00 p.m." },
  { nombre: "Punto Wok", horarios: "Lunes a viernes Desayunos: 7:00 a.m. - 10:00 a.m. Almuerzos: 11:45 a.m. - 3:30 p.m." },
  { nombre: "Banderitas", horarios: "Lunes a viernes, 12:00 m. - 3:00 p.m." },
  { nombre: "Punto Café", horarios: "Lunes a viernes, 6:00 a.m. - 6:30 p.m. Sábados: 6:00 a.m. - 2:00 p.m." },
  { nombre: "Café de la Bolsa", horarios: "Lunes a viernes, 6:30 a.m. - 6:30 p.m. Sábado: 6:00 a.m. - 3:00 p.m." },
  { nombre: "Café Embarcadero", horarios: "Lunes a viernes, 6:30 a.m. - 6:00 p.m. Sábados: 6:30 a.m. - 3:00 p.m." },
  { nombre: "Café Estudio", horarios: "Lunes a viernes, 7:00 a.m. - 3:30 p.m." },
  { nombre: "Cipreses", horarios: "Lunes a viernes, 7:00 a.m. - 4:30 p.m." },
  { nombre: "Café y Letras", horarios: "Lunes a viernes, 7:00 a.m. - 3:30 p.m." },
  { nombre: "Punto Sándwich", horarios: "Lunes a viernes, 10:30 a.m. - 3:00 p.m." }
];

const uploadServicePoints = async () => {
  console.log("Iniciando la subida de puntos de servicio...");
  for (const point of servicePoints) {
    try {
      await addDoc(collection(db, "servicePoints"), point);
      console.log("Agregado:", point.nombre);
    } catch (error) {
      console.error("Error al agregar", point.nombre, error);
    }
  }
  console.log("Proceso completado.");
};

uploadServicePoints();
