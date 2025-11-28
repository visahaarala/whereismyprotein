import { foods } from './output/foods';

// make a list of igclassp options
const igclasspList: string[] = [];
{
  const index = foods.header.indexOf('igclassp');
  foods.rows.forEach((row) => {
    const igclassp = String(row[index]);
    if (!igclasspList.includes(igclassp)) {
      igclasspList.push(igclassp);
    }
  });
  // console.log(igclasspList.map((igcp) => igclass[igcp]));
}

const igclassList: string[] = [];
{
  const index = foods.header.indexOf('igclass');
  foods.rows.forEach((row) => {
    const igclass = String(row[index]);
    if (!igclassList.includes(igclass)) {
      igclassList.push(igclass);
    }
  });
  // console.log(igclassList.map((igcp) => igclass[igcp]));
}

const commonList = igclassList.filter((item) => igclasspList.includes(item));
console.log(commonList);
