# ploty-challenge
I used javascript plotly to create an interactive analytical dashboard for users to explore the "Belly Button Biodiversity dataset," which catlogs the microbes that colonize human navels.

The dataset comes from the research work at NC State's The Public Science Lab: Econolgy, Evolution and Biodiversity of Human Food. Full citation of the data below.  

Hulcr, J. et al.(2012) A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable. Retrieved from: http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## STEP 1: BAR CHART
1. I used the D3 library to read the sample.json file.
2. Created a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in a research participant.
3. These variables were used to build the bar chart: "sample_values", "otu_ids", and "otu_labels".

## STEP 2: BUBBLE CHART
1. I created a bubble chart that displayed each research participant's data
2. These variables were used for the chart: "otu_ids" for the x values and marker colors, "sample_values" for the y values and marker size, and "otu_labels" for the text values.

## STEP 3: METADATA TABLE
1. I displayed the sample metadata (i.e., the research participant's demographic information) in a table.
2. To display the information, I grabbed the key-value pair from the metadata JSON object

## STEP 4: UPDATE THE DASHBOARD
1. I created a function when the research participant's id was selected, the plots on the dashboard changed to reflect that research participant's information.

## STEP 5: GAUGE CHART (a fun plotly exploration opportunity)
1. I also tried my hand in graphing the weekly frequency of belly button washing for each research participant through a gauge chart.
2. The standard gauge chart code on plotly's documentation page (https://plotly.com/javascript/) was modified to account for values ranging from 0 through 9.
3. Again, the whole dashboard was updated whenever a new research participant is selected.

