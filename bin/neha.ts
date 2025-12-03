#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { s3stack } from '../lib/neha-stack';

const app = new cdk.App();
new s3stack(app, 'S3Stack', {
  
});