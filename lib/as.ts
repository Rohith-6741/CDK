import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as autoscaling from 'aws-cdk-lib/aws-autoscaling';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';

interface AsgStackProps extends cdk.StackProps {
  vpc: ec2.IVpc;
  listener: elbv2.ApplicationListener;
}

export class AsgStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props: AsgStackProps) {
    super(scope, id, props);

    const asg = new autoscaling.AutoScalingGroup(this, 'MyASG', {
      vpc: props.vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
      machineImage: ec2.MachineImage.latestAmazonLinux(),
      minCapacity: 2,
      maxCapacity: 4,
    });

    props.listener.addTargets('ASGTarget', {
      port: 80,
      targets: [asg]
    });
  }
}
