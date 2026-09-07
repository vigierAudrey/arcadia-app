const OPEN_PARAM = "open";
const MAX_OPEN_ITEMS = 120;
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export type AdminSearchParams = Record<string, string | string[] | undefined>;

export function getOpenItems(searchParams: AdminSearchParams) {
  const rawOpenItems = searchParams[OPEN_PARAM];
  const values = Array.isArray(rawOpenItems)
    ? rawOpenItems
    : rawOpenItems
      ? [rawOpenItems]
      : [];

  return new Set(
    values.filter((value) => UUID_PATTERN.test(value)).slice(0, MAX_OPEN_ITEMS),
  );
}

export function getToggleHref(openItems: Set<string>, itemId: string) {
  const params = new URLSearchParams();
  const nextOpenItems = new Set(openItems);

  if (nextOpenItems.has(itemId)) {
    nextOpenItems.delete(itemId);
  } else {
    nextOpenItems.add(itemId);
  }

  for (const openItemId of nextOpenItems) {
    params.append(OPEN_PARAM, openItemId);
  }

  const query = params.toString();
  return `/admin${query ? `?${query}` : ""}#node-${itemId}`;
}
