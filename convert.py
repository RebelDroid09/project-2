import pandas as pd
df = pd.read_csv (r'C:\Users\Ivan\OneDrive\Desktop\project-2\CPI_2019_2018_2017.csv')
df.to_json (r'C:\Users\Ivan\OneDrive\Desktop\project-2\CPI_2019_2018_2017.json',orient='table')