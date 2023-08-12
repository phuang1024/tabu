"""
Convert CSV to words.js
"""

import argparse

parser = argparse.ArgumentParser()
parser.add_argument("csv", help="CSV file to convert")
args = parser.parse_args()

words = []
with open(args.csv, "r") as f:
    for line in f:
        line = line.replace('"', "").replace("'", "")
        parts = line.strip().split(",")
        if len(parts[0]) > 0 and parts[0] != "Timestamp":
            words.append(parts)

with open("words.js", "w") as f:
    f.write("let ALL_WORDS = [\n")
    for word in words:
        f.write("    [")
        for part in word:
            f.write(f'"{part}", ')
        f.write("],\n")
    f.write("];\n")
