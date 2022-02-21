#!/bin/bash
APP=website

kubectl rollout restart deploy $APP \
  && kubectl get po -w

