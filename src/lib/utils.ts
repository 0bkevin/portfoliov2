
export const formatDateToDisplay = (dateString: Date | string) =>{
  return new Date(dateString).toLocaleDateString("es-VE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
