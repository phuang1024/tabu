"""
Convert TSV to words.js
"""

import argparse

parser = argparse.ArgumentParser()
parser.add_argument("tsv", help="tab separated value file to convert")
args = parser.parse_args()

words = []
with open(args.tsv, "r") as f:
    for line in f:
        line = line.replace('"', "").replace("'", "")
        parts = line.strip().split("\t")[:8]
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
