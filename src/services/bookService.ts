export async function getBooks(
  page = 1,
  pageSize = 20,
  search = "",
  onlyOffers = false
) {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
    search,
  });

  if (onlyOffers) {
    params.append("onlyOffers", "true");
  }

  const res = await fetch(`/api/books?${params.toString()}`);
  if (!res.ok) throw new Error("Error fetching books");
  return res.json();
}
