import styles from './Info.module.scss';

const Info = ({ show }: { show: boolean }) => {
  const showThoughts = window.location.href.includes('/thoughts');

  return (
    <div className={styles.info} style={{ display: show ? 'flex' : 'none' }}>
      <h1>Where is my protein?</h1>
      <p>
        For vegans, there's always the question of where do you get your
        protein. The purpose of this tool is to answer that question as well as
        give an idea of the energy balance of some other nutrients.
      </p>

      <h3>Search</h3>
      <p>Raw: Unprocessed or raw. Scientific: Has a scientific name.</p>
      <p>
        Search with words or parts of words. Use '-' in front to exclude a word.
      </p>
      <h4>Categories</h4>
      <p>
        Choose category from the dropdown menu. With no category chosen, all
        foods are displayed.
      </p>
      <h4>Language</h4>
      <p>
        The en/fi toggle in Fineli is for food and category names only.
        Everything else is in english.
      </p>

      <h4>limits</h4>
      <p>there's a 10% margin for both min & max values....</p>

      <h4>Foodview</h4>
      <p>Click anywhere to close</p>

      <h3>Fineli</h3>
      <p>
        Browse the energy balance of macronutrients (including fiber) in
        different foods. Carbohydrates are split into sugars and starches. There
        is an option to search the results in either english or finnish.
      </p>
      <h4>Calculations</h4>
      <p>
        Energy balance is calculated such that fats are 9kcal/g, starch 4kcal/g,
        sugar 4kcal/g, protein 4kcal/g, fiber 2kcal/g, sugar alcohols 2.4kcal/g,
        organic acids 3kcal/g and alcohol 7kcal/g.
      </p>
      <p>---- ADD ALCOHOL: 29 kJ (7 kcal)/g. ----</p>
      <h4>Source of data</h4>
      <p>
        Peruspaketti 1 (Basic package 1)
        <br />
        <a href='https://fineli.fi/fineli/fi/avoin-data'>
          https://fineli.fi/fineli/fi/avoin-data
        </a>
      </p>

      <h3>USDA</h3>
      <p>The PROTEIN investigator!</p>
      <p>
        Browse the fiber, the essential amino acid and the total protein content
        in different foods. Results are shown as a percentage of recommended
        daily intake (RDI), assuming that the daily energy needs would be met
        with that particular food.
      </p>
      <h4>Calculations</h4>
      <p>Reference 70kg 2000kcal person. WHY???</p>
      <p>...</p>
      <h4>Source of data</h4>
      <p>RDI recommendations: wikipedia etc</p>
      <p>USDA database</p>

      {showThoughts ? (
        <>
          <h3>Personal thoughts</h3>
          <p>
            This tool, inspired by{' '}
            <a href='https://nutritionfacts.org'>nutritionfacts.org</a>, is
            aimed to support a diet centered around whole plant foods.
          </p>
          <p>
            With this tool it's easier to understand why starch foods like whole
            grains, beans and starchy tubers are fantastic sources of energy.
            Not too much fat, not too much sugar, moderate protein and plenty of
            fiber. Plus they're relatively cheap.
          </p>
          <p>
            It's also easy to see that animal foods are completely devoid of
            fiber. Fiber is the stuff that feeds the good bacteria in our gut,
            and the good bacteria turn fiber into short-chain fatty acids that
            are like the absolute superfood for our long term health. To utilize
            this benefit, it's important that the food we eat for energy
            contains fiber. A leafy green here and there won't cover the fiber
            deficiency if our main energy source has very little fiber.
          </p>
          <p>
            If eating whole unrefined plant foods, the fats that I get will be
            of good quality. So fats, no stress. However, I might be eating too
            much fruits, thus getting crazy amounts of sugar and very little
            protein. That's why carbs are separated..
          </p>
          <p>
            Blood sugar spikes spoil my energy and creativity. Many people go
            about snacking throughout the day to keep their blood sugars from
            falling. For me the best way to keep my energy stable is to eat
            mainly whole intact starch foods, thylakoids (leafy greens) plus
            some nuts and seeds. Veggies I like to have plenty during lunch.
            Fruits and berries work best as a dessert or in porridge - in small
            amounts. I like to keep my sugar intake relatively small while
            getting the health benefits from fruits and berries.
          </p>
          <p>
            Excess protein - especially animal protein - makes your body age
            faster. Staying healthy and able equals keeping your body young.
            Thus, although protein is essential, it's healthiest in moderation
            and from plant sources.
          </p>
          <p>
            As an almost vegan, eating almost exclusively whole intact plant
            foods, it's important for me to take care of my B12 and omega3 (EPA,
            DHA) intake.
          </p>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Info;
