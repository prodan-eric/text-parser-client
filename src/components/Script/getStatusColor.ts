const getStatusColor = (state: string) => {
  switch (state) {
    case "failed":
      return "text-red-500"
  }
}
export default getStatusColor
