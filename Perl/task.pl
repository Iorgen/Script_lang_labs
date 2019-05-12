#!/usr/bin/perl

open(INPUT_FILE, "< access.log");

%result_ips = ();

while ($line = <INPUT_FILE>) {
    if ($line =~ m/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/) {
        if (exists $result_ips{$1}) {
            $result_ips{$1}++;
        }
        else {
            $result_ips{$1} = 1;
        }
    }
}

@sorted_result = sort {$result_ips{$a} cmp $result_ips{$b}} keys %result_ips ;

for (my $i=0; $i < 10; $i++) {
    print $sorted_result[$i], "\n";
}





