#!/bin/bash

input="logo.ase"
basename="logo"
aseprite -b "$input" --scale 4 --save-as "./${basename}.png"
