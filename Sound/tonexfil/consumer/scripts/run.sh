#!/bin/bash

cd  ../out/production/sndanalyzer/
java -cp ../../../libs/TarsosDSP-latest.jar:../../../libs/commons-cli-1.4.jar:. PitchAnalyze $*
