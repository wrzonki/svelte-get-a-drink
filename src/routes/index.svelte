<script>
  const getDrink = async () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const data = await(await(fetch(url))).json();
  return data.drinks.map((item) => ({
    ingridients: Object.entries(item)
      .filter(([key, value]) => key.match('strIngredient') !== null && value !== null)
      .map(el => el[1]),
    alcoholic: item.strAlcoholic === 'Alcoholic',
    instructions: item.strInstructions,
    name: item.strDrink,
    thumb: item.strDrinkThumb,
  }))[0];
}
  export let drink;
  console.log(drink);
  const handleOnClick = async () => {
    drink = await getDrink();
  }
</script>

<div class="wrapper">
  <button on:click={handleOnClick}>Get new Drink</button>
  <h2>{drink.name}</h2>
  <img class="drink-thumb" src="{drink.thumb}" alt="" srcset="">
  <p>{drink.instructions}</p>

  {#each drink.ingridients as ingridient}
    <p class="ingridient">{ingridient}</p>
  {/each}
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  .drink-thumb {
    width: 200px;
    height: 200px;
  }

  p {
    max-width: 500px;
    text-align: center;
  }

  .ingridient {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>