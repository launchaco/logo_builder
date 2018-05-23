# Launchaco AI Logo Builder

A simple, open source, data powered logo builder. Using a set of fonts and their classifications the logo builder AI selects a set of similar fonts to create compelling logos.

## Getting started

Run it yourself:
```
git clone https://github.com/launchaco/logo_builder.git
cd logo_builder
npm install
npm run server
```

Live demo: [www.launchaco.com/logo/demo](https://www.launchaco.com/logo/demo)

See it in action: [www.launchaco.com/logo](https://www.launchaco.com/logo)

## Dataset
All fonts used in this application are licensed under 'Open Font License', and are referenced under [dataset/OFL/](/dataset/OFL).

The [dataset/ALL/](/dataset/ALL) directory showcases all the fonts that the launchaco logo builder uses, some of which are not under 'Open Font License'.

We manually classified all fonts to the following feature vector:
```
{
  "type": "cursive",
  "era": 0.5,
  "maturity": 0.7,
  "weight": 0.7,
  "personality": 0.5,
  "definition": 0.2,
  "concept": 0.5,
}
```


[dataset/All/all.json](/dataset/ALL/all.json) contains all the fonts used for the Launchaco logo builder as seen on [www.launchaco.com/logo](https://www.launchaco.com/logo). We can't have non-OFL font files in the repo, which is why there is a seperate OFL folder with 3 additional files which each contain OFL cursive, sans-serif and serif fonts.

Each dataset contains an array of objects, where each object is the font object that contains meta about the author and license, alongside the feature vector.

### Kernel density estimation

Shows density of each feature to another, to show missing areas of our dataset.
![Kernel density estimation graph](/frontend/img/7Projection.png)

### Parallel Coordinates

Another figure to help visualize the quasi high-dimensional font vectors of our dataset.
![Parallel coordinates graph](/frontend/img/ParallelCoords.png)

## Classifying Fonts
The classification was done manually and is subjective. Here are our reasonings behind the 0.0-1.0 values per each feature:

### era 
Does the font look 'Traditional' (0) or 'Modern' (1.0)

### maturity
Does the font look 'Mature' (0) or 'Youthful' (1.0)

### weight
Does the font look 'Thin' (0) or 'Bold' (1.0)

### personality
Does the font look 'Playful' (0) or 'Sophisticated' (1.0)

### definition
Does the font look 'Organic' (0) or 'Geometric' (1.0)

### concept
Does the font look 'Abstract' (0) or 'Literal' (1.0)

## Contact Us

For questions feel free to contact us at [contact@launchaco.com](mailto:contact@launchaco.com).

Follow us on [Twitter](https://twitter.com/launchaco) and [Facebook](https://www.facebook.com/launchaco/) to be kept up to date with new features and products.
