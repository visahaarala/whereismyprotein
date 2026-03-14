import isMobile from '../util/isMobile';
import styles from './Info.module.scss';

const Info = ({ show }: { show: boolean }) => {
  return (
    <div className={styles.info} style={show ? {} : { display: 'none' }}>
      <h1>Where is my protein?</h1>
      <p>
        For vegans, there's always the question of where do you get your
        protein. The purpose of this tool is to answer that question as well as
        give an idea of the energy balance of different nutrients.
      </p>

      <h3>Fineli</h3>
      <p>
        Browse the energy balance of macronutrients (including fiber and
        alcohol) in different foods. Carbohydrates are split into sugar, starch,
        organic acid and sugar alcohol.
      </p>

      <h4>Raw</h4>
      <p>Show only foods that are raw or unprocessed.</p>

      <h4>Scientific</h4>
      <p>Show only foods that have a scientific name.</p>

      <h4>Finnish</h4>
      <p>Toggle search & results language between finnish and english.</p>

      <h4>Search / limit</h4>
      <p>
        Search foods by categories and food names.
        <br />
        Limit foods by energy density and energy distribution.
      </p>

      <h4>Results view</h4>
      <p>
        {isMobile() ? 'Tap ' : 'Click '}
        on a food name to view details.
        <br />
        {isMobile() ? 'Tap ' : 'Click '}
        anywhere on the details to exit back to browsing.
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
      <p>
        Browse the fiber, the essential amino acid and the total protein content
        in different foods. Results are shown as a percentage of recommended
        daily intake (RDI), assuming that the daily energy needs would be met
        with that particular food.
      </p>

      <h4>Energy density</h4>
      <p>
        Filter out foods that are not included in a given range of energy
        density.
      </p>

      <h4>Percentage of RDI</h4>
      <p>
        The % of RDI slider is to filter out foods that do not meet the given
        percentage of RDI requirement. The usage of essential amino acids
        (EAAs), total protein and fiber as a limiter in this filter can be
        toggled on/off one by one.
      </p>

      <h4>Search / view categories</h4>
      <p>
        Search foods by category/name or view the effect of energy density and
        percentage of RDI sliders to the inclusion of foods in different
        categories. The raw toggle can be used to filter out foods whose name
        does not contain ", raw".
      </p>

      <h4>Results view</h4>
      <p>
        {isMobile() ? 'Tap ' : 'Click '}
        on a food name to view details.
        <br />
        {isMobile() ? 'Tap ' : 'Click '}
        anywhere on the details to exit back to browsing.
      </p>

      <h4>Calculations - Recommended Daily Intake</h4>
      <p>
        <a href='https://tools.myfooddata.com/protein-calculator/'>
          https://tools.myfooddata.com/protein-calculator/
        </a>{' '}
        suggests that 200 kcal is 10% of DV; daily energy reference is 2000kcal.
        Comparing tools.myfooddata.com amino acid RDI percentages with wikipedia
        essential amino acid{' '}
        <a href='https://en.wikipedia.org/wiki/Essential_amino_acid#Recommended_daily_intake'>
          RDI chart (WHO)
        </a>{' '}
        suggests that the calculations are for a 70kg person. Thus, the % of RDI
        calculations in this tool are for a 70kg person consuming 2000kcal of a
        particular food.
      </p>
      <p>Protein RDI used is 10% of energy.</p>
      <p>Fiber RDI used is 14g/1000kcal.</p>

      <h4>Source of data</h4>
      <p>
        SR Legacy dataset
        <br />
        <a href='https://fdc.nal.usda.gov/download-datasets'>
          https://fdc.nal.usda.gov/download-datasets
        </a>
      </p>
      <p>
        WHO essential amino acid RDI
        <br />
        <a href='https://en.wikipedia.org/wiki/Essential_amino_acid#Recommended_daily_intake'>
          https://en.wikipedia.org/wiki/Essential_amino_acid#Recommended_daily_intake
        </a>
      </p>
      <p>
        The dataset is filtered such that only foods with info about energy,
        protein, fiber and essential amino acid content are included. Not all
        categories from the database are included.
      </p>

      <h3>About</h3>
      <p>
        The FINELI section of this software was inspired by{' '}
        <a href='https://fineli.fi/'>fineli.fi</a> as well as curiosity of the
        energy balance of different macronutrients in foods.
      </p>
      <p>
        The USDA section of this software was inspired by{' '}
        <a href='https://tools.myfooddata.com/protein-calculator/'>
          myfooddata.com protein calculator
        </a>{' '}
        with an intent to make the fiber and essential amino acid information
        more easily accessible.
      </p>
    </div>
  );
};

export default Info;
