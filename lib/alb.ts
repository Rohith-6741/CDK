
import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';

interface AlbStackProps extends cdk.StackProps {
  vpc: ec2.IVpc;
}

export class AlbStack extends cdk.Stack {
  public readonly alb: elbv2.ApplicationLoadBalancer;
  public readonly listener: elbv2.ApplicationListener;

  constructor(scope: cdk.App, id: string, props: AlbStackProps) {
    super(scope, id, props);

    this.alb = new elbv2.ApplicationLoadBalancer(this, 'MyALB', {
      vpc: props.vpc,
      internetFacing: true,
    });

    this.listener = this.alb.addListener('Listener', {
      port: 80,
      open: true,
    });
  }
}
