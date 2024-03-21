export function buildQuery(tagArray: string[], similarity?: number) {
  let dynamicQuery = 'SELECT SUM(';

  tagArray.forEach((tag: string, index: number) => {
    if (index > 0) {
      dynamicQuery += ' + ';
    }

    dynamicQuery += `CASE
    WHEN SIMILARITY('${tag}', tag) > ${
      similarity || 0.27
    } THEN SIMILARITY('${tag}', tag)
    ELSE 0
  END`;
  });

  dynamicQuery += ')';

  return dynamicQuery;
}

export function buildConditions(tagArray: string[], similarity?: number) {
  return tagArray.length !== 0
    ? tagArray
        .map(
          word =>
            `similarity(unaccent(LOWER(tag)), unaccent(lower('${word}'))) > ${
              similarity || 0.27
            }`,
        )
        .join(' OR ')
    : null;
}
