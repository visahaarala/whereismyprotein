import styles from './Info.module.scss';

const Info = ({ show }: { show: boolean }) => {
  const showThoughts = window.location.href.includes('/thoughts');

  return (
    <div className={styles.info} style={{ display: show ? 'flex' : 'none' }}>
      <h1>Where is my protein?</h1>
      <p>
        For vegans, there's always the question of where do you get your
        protein. The purpose of this tool is to answer that question as well as
        give an idea of the energy balance of different nutrients.
      </p>

      <h3>Fineli</h3>
      <p>
        Browse the energy balance of macronutrients (including fiber and
        alcohol) in different foods. Carbohydrates are split into sugars,
        starches, organic acids and sugar alcohols.
      </p>

      <h4>Raw</h4>
      <p>Show only foods that are raw or unprocessed.</p>

      <h4>Scientific</h4>
      <p>Show only foods that have a scientific name.</p>

      <h4>Finnish</h4>
      <p>Toggle search & results language between finnish and english.</p>

      <h4>Search / limit</h4>
      <p>
        Choose between searching foods by categories and food names or limiting
        foods by energy density and energy distribution.
      </p>

      <h4>Results view</h4>
      <p>
        Click on a food name to view details. Click anywhere on the details to
        exit back to browsing.
      </p>

      <h4>Calculations</h4>
      <p>
        Energy balance is calculated such that fats are 9kcal/g, protein
        4kcal/g, fiber 2kcal/g, starch 4kcal/g, sugar 4kcal/g, sugar alcohols
        2.4kcal/g, organic acids 3kcal/g and alcohol 7kcal/g.
      </p>

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

      <h4>Search details</h4>
      <p>
        Energy density, percentage of RDI, search/viewcategories, etc.. (fix
        this)
      </p>

      <h4>Calculations</h4>
      <p>
        <a href='https://tools.myfooddata.com/protein-calculator/'>
          Tools.myfooddata.com protein calculator
        </a>{' '}
        suggests that 200 kcal is 10% of DV; daily energy reference is 2000kcal.
        Comparing tools.myfooddata.com amino acid RDI percentages with{' '}
        <a href='https://en.wikipedia.org/wiki/Essential_amino_acid#Recommended_daily_intake'>
          wikipedia essential amino acid RDI chart
        </a>{' '}
        (WHO) suggests that the calculations are for a 70kg person. Thus, the{' '}
        <b>% of RDI</b> calculations in this program are for a 70kg person
        consuming 2000kcal of a particular food.
      </p>

      <h4>Source of data</h4>
      <p>
        SR Legacy dataset from{' '}
        <a href='https://fdc.nal.usda.gov/download-datasets'>
          https://fdc.nal.usda.gov/download-datasets
        </a>
      </p>
      <p>
        The dataset is filtered such that only foods with info about energy,
        protein, fiber and essential amino acid content are included.
      </p>

      <h3>About</h3>
      <p>
        This software is inspired by
        <br />
        <a href='https://nutritionfacts.org'>https://nutritionfacts.org </a>
        <br />
        and
        <br />
        <a href='https://tools.myfooddata.com/protein-calculator/'>
          https://tools.myfooddata.com/protein-calculator/
        </a>
      </p>

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
