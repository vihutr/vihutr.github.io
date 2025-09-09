import os, json, sys

blog_dir = "../blog/"

files = []

for filename in sorted(os.listdir(blog_dir)):
    filepath = os.path.join(blog_dir, filename)
    if os.path.isfile(filepath):
        files.append(filename)

with open("../blog_entries.json", "w") as file:
    json.dump(files, file, indent=2)

print("Updated Entries")
