![img](https://raw.githubusercontent.com/ingochris/treehacks2018/master/frontend/src/logo.png)
<h1>The Social-Engineer Firewall (SEF) <a href="https://travis-ci.org/ingochris/social-engineer-firewall"><img src="https://travis-ci.org/ingochris/social-engineer-firewall.svg" valign="middle" alt="Build Status"/></a></h1>

Copyright 2018 The Social-Engineer Firewall (SEF)

Written by Christopher Ngo, Jennifer Zou, Kyle O'Brien, and Omri Gabay. 

Founded Treehacks 2018, Stanford University.

## F.U.D.

No matter how secure your code is, the biggest cybersecurity vulnerability is the human vector. It takes very little to exploit an end-user with social engineering, yet the consequences are severe. 

Practically every platform, from banking to social media, to email and corporate data, implements some form of self-service password reset feature based on security questions to authenticate the account “owner.”

Most people wouldn’t think twice to talk about their favourite pet or first car, yet such sensitive information is all that stands between a social engineer and total control of all your private accounts.

## What it does

The Social-Engineer Firewall (SEF) aims to protect us from these threats. Upon activation, SEF actively monitors for known attack signatures with voice to speech transcription courtesy of SoundHound’s Houndify engine. SEF is the world’s first solution to protect the OSI Level 8 (end-user/human) from social engineer attacks.

## How it was built

SEF is a Web Application written in React-Native deployed on Microsoft Azure with node.js. iOS and Android app versions are powered by Expo. Real-time audio monitoring is powered by the Houndify SDK API.

## Todo List
* Complete development of classification model for attack signature database recognition*
* Localize NLP**
* Amazon Alexa prototype
* IOT planning and prototyping

### \*ML Implementation - Solving a statistical binary classification problem, candidates:
* Decision trees
* Random forests
* Bayesian networks
* Support vector machines
* Neural networks
* Logistic regression

### \*\*NLP Implementation - To be localized and FLOSS, candidates:
* Mozilla Deepspeech (Tensorflow[py] based)(Language Model: KenLM)(Mozilla Public License 2.0)
* Facebook AI Research Automatic Speech Recognition Toolkit (wav2letter)(LUA based)(Language Model: KenLM)(BSD Licensed)
* Kaldi Speech Recognition Toolkit (C++)(Apache 2.0 License)
