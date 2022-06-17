export async function get(): Promise<{ body: any }> {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const data = await(await(fetch(url))).json();
  const drink = data.drinks.map((item: any) => ({
    ingridients: Object.entries(item)
      .filter(([key, value]) => key.match('strIngredient') !== null && value !== null)
      .map(el => el[1]),
    alcoholic: item.strAlcoholic === 'Alcoholic',
    instructions: item.strInstructions,
    name: item.strDrink,
    thumb: item.strDrinkThumb,
  }))[0];

  return {
    body: { drink },
  }
}