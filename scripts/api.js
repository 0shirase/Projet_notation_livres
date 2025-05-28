export async function getEvents() {
  try {
    const apiKey = "AIzaSyDmy7b4nVHyzHCaQ8fbGGtt_uuLe0IIEWg";
    const query = "Harry Potter";
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        query
      )}&key=${apiKey}`
    );

    const data = await response.json();

    console.log("🔷 Données brutes Google Books :", data);

    const books = data.items || [];

    books.forEach((book, i) => {
      const info = book.volumeInfo;
      console.log(`\n📚 Livre n°${i + 1}`);
      console.log("Titre :", info.title || "N/A");
      console.log("Auteur(s) :", (info.authors || ["N/A"]).join(", "));
      console.log("Pages :", info.pageCount || "N/A");
      console.log("Date publication :", info.publishedDate || "N/A");
      console.log(
        "Description :",
        info.description ? info.description.slice(0, 100) + "..." : "N/A"
      );
      console.log("Image couverture :", info.imageLinks?.thumbnail || "N/A");
      console.log("Langue :", info.language || "N/A");
      console.log("Lien Google Books :", info.infoLink || "N/A");
    });

    return books;
  } catch (error) {
    console.error("Erreur API:", error);
    return [];
  }
}
getEvents();
